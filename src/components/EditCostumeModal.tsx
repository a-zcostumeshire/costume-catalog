import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { CostumeForm } from './CostumeForm';

interface EditCostumeModalProps {
  costume: any;
  onSave: () => void;
  onClose: () => void;
}

const EditCostumeModal: React.FC<EditCostumeModalProps> = ({ costume, onSave, onClose }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
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

export default EditCostumeModal;