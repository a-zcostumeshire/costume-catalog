import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { costumeService } from '../firebase/costumeService';

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

interface CostumeFormProps {
  onSuccess: (newCostumes: Costume[]) => void;
}

export const CostumeForm: React.FC<CostumeFormProps> = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    sizes: '',
    price: '',
    deposit: '',
    status: 'available'
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const sizes = formData.sizes.split(',').map(size => size.trim());
      await costumeService.addCostume(
        {
          ...formData,
          sizes,
          price: Number(formData.price),
          deposit: Number(formData.deposit)
        },
        imageFile
      );
      setFormData({
        name: '',
        category: '',
        description: '',
        sizes: '',
        price: '',
        deposit: '',
        status: 'available'
      });
      setImageFile(null);
      setImagePreview(null);
      if (onSuccess) onSuccess([]);
    } catch (error) {
      console.error('Error saving costume:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Costume</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Costume Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <Select 
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="historical">Historical</SelectItem>
                <SelectItem value="fantasy">Fantasy</SelectItem>
                <SelectItem value="animals">Animals</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Available Sizes (comma-separated)</label>
            <Input
              value={formData.sizes}
              onChange={(e) => setFormData(prev => ({ ...prev, sizes: e.target.value }))}
              placeholder="S, M, L"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price ($)</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Deposit ($)</label>
              <Input
                type="number"
                value={formData.deposit}
                onChange={(e) => setFormData(prev => ({ ...prev, deposit: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Costume Image</label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4"
            />
          </div>

          {imagePreview && (
            <div className="mt-2">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="max-w-[200px] h-auto rounded"
              />
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Saving...' : 'Add Costume'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};