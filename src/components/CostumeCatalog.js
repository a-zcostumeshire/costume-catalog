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
