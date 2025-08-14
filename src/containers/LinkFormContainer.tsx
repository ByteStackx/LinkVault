import React, { useState, useEffect } from "react";
import LinkForm from "../components/LinkForm";
import { Button } from "../components/Button";
import { type Link } from "../types";

type LinkFormContainerProps = {
  onSave: (link: Link) => void;
  editingLink?: Link | null;
  showForm?: boolean;
  onClose?: () => void;
};

export const LinkFormContainer: React.FC<LinkFormContainerProps> = ({
  onSave,
  editingLink = null,
  showForm: showFormProp = false,
  onClose,
}) => {
  const [showForm, setShowForm] = useState(showFormProp);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    setShowForm(showFormProp);
  }, [showFormProp]);

  const showMessage = (text: string, type: 'success' | 'error' = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000); // hide after 3s
  };

  const handleSave = (link: Link) => {
    onSave(link);
    showMessage(editingLink ? "Link updated successfully!" : "Link added successfully!");
    setShowForm(false);
    onClose?.();
  };

  return (
    <div className="link-form-container">
      {!showForm && (
        <Button className="add-btn" onClick={() => setShowForm(true)}>
          Add New Link
        </Button>
      )}

      {showForm && (
        <LinkForm
          link={editingLink}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            onClose?.();
          }}
        />
      )}

      {message && (
        <div className={`message ${message.type === 'success' ? 'message-success' : 'message-error'}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};
