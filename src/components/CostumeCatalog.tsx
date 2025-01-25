import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs'; // Adjust the path as needed
import { Auth } from './Auth';
import { CostumeForm } from './CostumeForm';

interface Costume {
  id: string;
  name: string;
  description: string;
  category: string;
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

  useEffect(() => {
    // Mock data for testing purposes
    const mockCostumes: Costume[] = [
      { id: '1', name: 'Vampire', description: 'Scary vampire costume', category: 'horror' },
      { id: '2', name: 'Pirate', description: 'Swashbuckling pirate costume', category: 'adventure' },
      { id: '3', name: 'Witch', description: 'Mystical witch costume', category: 'fantasy' },
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
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="catalog">Catalog</TabsTrigger>
        <TabsTrigger value="admin">Admin</TabsTrigger>
      </TabsList>
      <TabsContent value="catalog" activeValue={activeTab}>
        {filteredCostumes.map(costume => (
          <div key={costume.id}>
            {costume.name}
          </div>
        ))}
      </TabsContent>
      <TabsContent value="admin" activeValue={activeTab}>
        {!user ? (
          <Auth onLogin={() => setActiveTab('admin')} />
        ) : (
          <CostumeForm onSuccess={(newCostumes: Costume[]) => {
            setCostumes(newCostumes); // Update the costumes state with the new costumes
          }} />
        )}
      </TabsContent>
    </Tabs>
  );
};
