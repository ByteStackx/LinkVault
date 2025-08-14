import { type Link } from "../types";
import LinkCard from "./LinkCard";

type LinkListProps = {
  links: Link[];
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
};

export const LinkList: React.FC<LinkListProps> = ({ links, onEdit, onDelete }) => {
  if (links.length === 0) return <p>No links found.</p>;

  return (
    <div className="link-list">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          link={link}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default LinkList;
