import { useState, useEffect } from 'react';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import { Auth } from '@/components/Auth'; // Adjust path as needed
import { CostumeForm } from './CostumeForm';
import { costumeService } from '../firebase/costumeService';

export const CostumeCatalog = () => {
  const [costumes, setCostumes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('catalog');
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="catalog">Catalog</TabsTrigger>
        <TabsTrigger value="admin">Admin</TabsTrigger>
      </TabsList>

      <TabsContent value="catalog">
        {/* Your catalog content */}
      </TabsContent>

      <TabsContent value="admin">
        {/* Admin content */}
      </TabsContent>
    </Tabs>
  );
};
  useEffect(() => {
    const loadCostumes = async () => {
      const data = await costumeService.getCostumes();
      setCostumes(data);
    };
    loadCostumes();
  }, []);

  const filteredCostumes = costumes.filter(costume => {
    const matchesCategory = selectedCategory === 'all' || costume.category === selectedCategory;
    const matchesSearch = costume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         costume.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="catalog">Catalog</TabsTrigger>
        <TabsTrigger value="admin">Admin</TabsTrigger>
      </TabsList>

      <TabsContent value="catalog">
        {/* Catalog content using filteredCostumes */}
        {filteredCostumes.map(costume => (
          // Render costume items
        ))}
      </TabsContent>

      <TabsContent value="admin">
        {!user ? (
          <Auth onLogin={() => setActiveTab('admin')} />
        ) : (
          <CostumeForm onSuccess={() => {
            costumeService.getCostumes().then(setCostumes);
          }} />
        )}
      </TabsContent>
    </Tabs>
  );
};
