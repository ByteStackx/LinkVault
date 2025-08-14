// LinkCard.tsx
import { type Link } from "../types";
import { Button } from "./Button";

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
        {onEdit && (
          <Button className="edit-btn" onClick={() => onEdit(link)}>
            Edit
          </Button>
        )}
        {onDelete && (
          <Button className="delete-btn" onClick={() => onDelete(link.id)}>
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default LinkCard;
