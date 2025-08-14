import { type Link } from "../types";

type LinkCardProps = {
  link: Link;
  onEdit?: (link: Link) => void;
  onDelete?: (id: string) => void;
};

const LinkCard: React.FC<LinkCardProps> = ({ link, onEdit, onDelete }) => {
  return (
    <div className="link-card">
      <h3>
        <a href={link.url} target="_blank" rel="noopener noreferrer">
          {link.title}
        </a>
      </h3>

      {link.description && <p>{link.description}</p>}

      {link.tags && link.tags.length > 0 && (
        <div className="tags">
          {link.tags.map((tag, i) => (
            <span key={i} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="card-actions">
        {onEdit && <button className="edit-btn" onClick={() => onEdit(link)}>Edit</button>}
        {onDelete && <button className="delete-btn" onClick={() => {
            const confirmed = window.confirm(
                `Are you sure you want to delete "${link.title}"?`
            );
            if (confirmed) {
                onDelete(link.id);
            }
      }}
    >
      Delete
    </button>}
      </div>
    </div>
  );
};

export default LinkCard;
