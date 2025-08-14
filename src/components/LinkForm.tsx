import { useState, useEffect } from "react";
import { type Link } from "../types";

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
        .filter((t) => t)
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
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button type="submit">{link ? "Update Link" : "Add Link"}</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: "0.5rem" }}>
        Cancel
      </button>
    </form>
  );
};

export default LinkForm;
