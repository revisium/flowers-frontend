import { CategoryDetailModal } from './CategoryDetailModal';
import { araceaeCategoryData } from './data';

interface AraceaeCategoryModalProps {
  readonly onClose: () => void;
}

export const AraceaeCategoryModal = ({ onClose }: AraceaeCategoryModalProps) => (
  <CategoryDetailModal data={araceaeCategoryData} onClose={onClose} />
);
