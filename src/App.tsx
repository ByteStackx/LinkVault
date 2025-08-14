import { useState, useEffect } from "react";
import Header from "./components/Header";
import { LinkListContainer } from "./containers/LinkListContainer";
import { LinkFormContainer } from "./containers/LinkFormContainer";
import { type Link } from "./types";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  const [links, setLinks] = useState<Link[]>(() => {
    const saved = localStorage.getItem("links");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links]);

  const showMessage = (text: string, type: 'success' | 'error' = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000); // hide after 3s
  };

  const handleSaveLink = (link: Link) => {
    setLinks(prev =>
      prev.some(l => l.id === link.id)
        ? prev.map(l => (l.id === link.id ? link : l))
        : [...prev, link]
    );
    showMessage(link.id ? "Link updated successfully!" : "Link added successfully!");
    setShowForm(false);
  };

  const handleDeleteLink = (id: string) => {
    const linkToDelete = links.find(l => l.id === id);
    if (!linkToDelete) return;

    const confirmed = window.confirm(`Are you sure you want to delete "${linkToDelete.title}"?`);
    if (confirmed) {
      setLinks(prev => prev.filter(l => l.id !== id));
      showMessage(`"${linkToDelete.title}" deleted successfully!`);
    }
  };

  const filteredLinks = links.filter(link => {
    const query = searchQuery.toLowerCase();
    return (
      link.title.toLowerCase().includes(query) ||
      link.description.toLowerCase().includes(query) ||
      link.url.toLowerCase().includes(query) ||
      (link.tags && link.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  });

  return (
    <div className="app-container">
      <Header search={searchQuery} setSearch={setSearchQuery} />

      <main className="main-content">
        <section className="form-section">
          <LinkFormContainer
            onSave={handleSaveLink}
            editingLink={editingLink}
            showForm={showForm}
            onClose={() => setShowForm(false)}
          />
        </section>

        <section className="list-section">
          <LinkListContainer
            links={filteredLinks}
            onEdit={(link) => {
              setEditingLink(link); // populate form with selected link
              setShowForm(true);     // show the form
            }}
            onDelete={handleDeleteLink}
          />
        </section>
      </main>

      {message && (
        <div className={`message ${message.type === 'success' ? 'message-success' : 'message-error'}`}>
          {message.text}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
