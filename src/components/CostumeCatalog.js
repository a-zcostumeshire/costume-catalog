import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Auth } from './Auth';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

const CostumeCatalog = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('catalog');
  
  // State for costumes
  const [costumes, setCostumes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="catalog" className="flex-1">View Catalog</TabsTrigger>
          <TabsTrigger value="admin" className="flex-1">Admin</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog">
          {/* Catalog View */}
          <div className="mb-6 space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search costumes..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="historical">Historical</SelectItem>
                  <SelectItem value="fantasy">Fantasy</SelectItem>
                  <SelectItem value="animals">Animals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {costumes.map(costume => (
                <Card key={costume.id}>
                  <img 
                    src={costume.imageUrl || '/api/placeholder/300/400'} 
                    alt={costume.name}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold">{costume.name}</h3>
                    <p className="text-sm text-gray-600">{costume.description}</p>
                    <div className="mt-2">
                      <p>Price: ${costume.price}</p>
                      <p>Deposit: ${costume.deposit}</p>
                      <p>Sizes: {costume.sizes.join(', ')}</p>
                      <p>Status: {costume.status}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="admin">
          {!user ? (
            <Auth onLogin={() => setActiveTab('admin')} />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Add New Costume</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add Costume Form will go here */}
                <p>Admin section - form coming soon</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CostumeCatalog;
