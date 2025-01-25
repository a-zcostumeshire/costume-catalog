import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/Tabs'; // Adjust the path as needed
import { Auth } from './Auth';
import { CostumeForm } from './CostumeForm';

interface Costume {
  id: string;
  name: string;
  description: string;
  category: string;
  sizes: string[];
  price: number;
  deposit: number;
  status: string;
}

interface User {
  id: string;
}

export const CostumeCatalog = () => {
  const [costumes, setCostumes] = useState<Costume[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('catalog');
  const [editingCostume, setEditingCostume] = useState<Costume | null>(null);

  useEffect(() => {
    // Mock data for testing purposes
    const mockCostumes: Costume[] = [
      { id: '1', name: 'Vampire', description: 'Scary vampire costume', category: 'horror', sizes: ['S', 'M'], price: 50, deposit: 20, status: 'available' },
      { id: '2', name: 'Pirate', description: 'Swashbuckling pirate costume', category: 'adventure', sizes: ['M', 'L'], price: 60, deposit: 25, status: 'available' },
      { id: '3', name: 'Witch', description: 'Mystical witch costume', category: 'fantasy', sizes: ['L', 'XL'], price: 70, deposit: 30, status: 'available' },
    ];
    setCostumes(mockCostumes);
    console.log('Mock costumes set:', mockCostumes);
  }, []);

  const filteredCostumes = costumes.filter(costume => {
    const matchesCategory = selectedCategory === 'all' || costume.category === selectedCategory;
    const matchesSearch = costume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         costume.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  console.log('Filtered costumes:', filteredCostumes);

  return (
    <div>
      <h1>Costume Catalog</h1>
      <style jsx>{`
        .tabs {
          display: flex;
          flex-direction: column;
        }
        .tabs-list {
          display: flex;
          margin-bottom: 1rem;
        }
        .tabs-trigger {
          margin-right: 1rem;
          padding: 0.5rem 1rem;
          cursor: pointer;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .tabs-content {
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .costume-item {
          margin-bottom: 1rem;
        }
      `}</style>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="tabs">
        <TabsList value={activeTab} onValueChange={setActiveTab} className="tabs-list">
          <TabsTrigger value="catalog" onValueChange={setActiveTab} className="tabs-trigger">Catalog</TabsTrigger>
          <TabsTrigger value="admin" onValueChange={setActiveTab} className="tabs-trigger">Admin</TabsTrigger>
        </TabsList>
        <TabsContent value="catalog" activeValue={activeTab} className="tabs-content">
          {filteredCostumes.length > 0 ? (
            filteredCostumes.map(costume => (
              <div key={costume.id} className="costume-item">
                {costume.name}
              </div>
            ))
          ) : (
            <p>No costumes found.</p>
          )}
        </TabsContent>
        <TabsContent value="admin" activeValue={activeTab} className="tabs-content">
          {!user ? (
            <Auth onLogin={() => setActiveTab('admin')} />
          ) : (
            <CostumeForm
              initialData={editingCostume}
              onSuccess={(newCostumes: Costume[]) => {
                setCostumes(newCostumes); // Update the costumes state with the new costumes
              }}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};