import { useState, useEffect } from 'react';
import { 
 Tabs, 
 TabsList, 
 TabsTrigger, 
 TabsContent 
} from '@/components/ui/tabs';
import { Auth } from '@/components/Auth';
import { CostumeForm } from './CostumeForm';
import { costumeService } from '../firebase/costumeService';

interface Costume {
 id: string;
 name: string;
 description: string;
 category: string;
}

interface User {
 // Define user properties as needed
 id: string;
}

export const CostumeCatalog = () => {
 const [costumes, setCostumes] = useState<Costume[]>([]);
 const [selectedCategory, setSelectedCategory] = useState('all');
 const [searchTerm, setSearchTerm] = useState('');
 const [user, setUser] = useState<User | null>(null);
 const [activeTab, setActiveTab] = useState('catalog');

 useEffect(() => {
   const loadCostumes = async () => {
     try {
       const data = await costumeService.getCostumes();
       setCostumes(data);
     } catch (error) {
       console.error('Failed to load costumes:', error);
     }
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
       {filteredCostumes.map(costume => (
         <div key={costume.id}>
           {costume.name}
         </div>
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
