import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { CostumeForm } from './CostumeForm';

export const EditCostumeModal = ({ costume, isOpen, onClose, onSave }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Costume</DialogTitle>
        </DialogHeader>
        <CostumeForm 
          initialData={costume} 
          onSuccess={() => {
            onSave();
            onClose();
          }} 
          isEditing={true}
        />
      </DialogContent>
    </Dialog>
  );
};
