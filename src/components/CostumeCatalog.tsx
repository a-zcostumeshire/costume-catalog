import { useEffect } from 'react';
import { CostumeForm } from './CostumeForm';
import { costumeService } from '../firebase/costumeService';

// In your CostumeCatalog component, add:
useEffect(() => {
  const loadCostumes = async () => {
    const data = await costumeService.getCostumes();
    setCostumes(data);
  };
  loadCostumes();
}, []);

// Replace the admin section with:
<TabsContent value="admin">
  {!user ? (
    <Auth onLogin={() => setActiveTab('admin')} />
  ) : (
    <CostumeForm onSuccess={() => {
      costumeService.getCostumes().then(setCostumes);
    }} />
  )}
</TabsContent>
// Add to CostumeCatalog.js
const filteredCostumes = costumes.filter(costume => {
  const matchesCategory = selectedCategory === 'all' || costume.category === selectedCategory;
  const matchesSearch = costume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       costume.description.toLowerCase().includes(searchTerm.toLowerCase());
  return matchesCategory && matchesSearch;
});

// Use filteredCostumes instead of costumes in your mapping
