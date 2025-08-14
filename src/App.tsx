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

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links]);

  const [editingLink, _setEditingLink] = useState<Link | null>(null);
  const [showForm, setShowForm] = useState(false);

  // const handleEditLink = (link: Link) => {
  // setEditingLink(link); // populate the form
  // setShowForm(true);    // show the form
  // };


  const handleSaveLink = (link: Link) => {
    setLinks(prev =>
      prev.some(l => l.id === link.id)
        ? prev.map(l => (l.id === link.id ? link : l))
        : [...prev, link]
    );
  };

  const handleDeleteLink = (id: string) => {
    setLinks(prev => prev.filter(l => l.id !== id));
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
            onEdit={() => {}}
            onDelete={handleDeleteLink}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
