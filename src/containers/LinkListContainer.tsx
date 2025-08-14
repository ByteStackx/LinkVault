import { type Link } from "../types";
import LinkList from "../components/LinkList";

type LinkListContainerProps = {
  links: Link[];
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
};

export const LinkListContainer: React.FC<LinkListContainerProps> = ({
  links,
  onEdit,
  onDelete,
}) => {
  return (
    <LinkList
      links={links}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};
