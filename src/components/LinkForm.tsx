import { useState, useEffect } from "react";
import { type Link } from "../types";
import { TextInput } from "./TextInput";
import { Button } from "./Button";

type LinkFormProps = {
  link?: Link | null;
  onSave: (link: Link) => void;
  onCancel: () => void;
};

const LinkForm: React.FC<LinkFormProps> = ({ link, onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (link) {
      setTitle(link.title);
      setUrl(link.url);
      setDescription(link.description);
      setTags(link.tags?.join(", ") || "");
    } else {
      setTitle("");
      setUrl("");
      setDescription("");
      setTags("");
    }
  }, [link]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = link?.id || Date.now().toString();

    onSave({
      id,
      title,
      url,
      description,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
    });

    if (!link) {
      setTitle("");
      setUrl("");
      setDescription("");
      setTags("");
    }
  };

  return (
    <form className="link-form" onSubmit={handleSubmit}>
      <TextInput
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        name="title"
        id="title"
      />

      <TextInput
        label="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        name="url"
        id="url"
      />

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <TextInput
        label="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        name="tags"
        id="tags"
      />

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Button type="submit">
          {link ? "Update Link" : "Add Link"}
        </Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default LinkForm;
