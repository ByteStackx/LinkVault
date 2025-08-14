import { useState, useEffect } from "react";
import Header from "./components/Header";
import LinkForm from "./components/LinkForm";
import LinkList from "./components/LinkList";
import { type Link } from "./types";
import "./App.css";

function App() {
  const [links, setLinks] = useState<Link[]>(() => {
    const saved = localStorage.getItem("links");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  // Persist links to localStorage whenever links change
  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links]);

  // Add or update link
  const handleSaveLink = (link: Link) => {
    let updatedLinks: Link[];
    if (editingLink) {
      // Update existing link
      updatedLinks = links.map((l) => (l.id === link.id ? link : l));
      setEditingLink(null);
    } else {
      // Add new link
      updatedLinks = [...links, link];
    }

    setLinks(updatedLinks);
    setShowForm(false);
  };


  const handleDeleteLink = (id: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  };

  const filteredLinks = links.filter((link) => {
    const query = searchQuery.toLowerCase();
    return (
      link.title.toLowerCase().includes(query) ||
      link.description.toLowerCase().includes(query) ||
      link.url.toLowerCase().includes(query) ||
      (link.tags && link.tags.some((tag) => tag.toLowerCase().includes(query)))
    );
  });

  return (
    <div className="app-container">
      <Header search={searchQuery} setSearch={setSearchQuery} />

      <main className="main-content">
        <section className="form-section">
          <button
            className="add-btn"
            onClick={() => {
              setShowForm((prev) => !prev);
              setEditingLink(null);
            }}
          >
            {showForm ? "Cancel" : "Add New Link"}
          </button>

          {showForm && (
            <LinkForm
              link={editingLink}
              onSave={handleSaveLink}
              onCancel={() => setShowForm(false)}
            />
          )}
        </section>

        <section className="list-section">
          <LinkList
            links={filteredLinks}
            onEdit={(link) => {
              setEditingLink(link);
              setShowForm(true);
            }}
            onDelete={handleDeleteLink}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
