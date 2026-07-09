import { CategoryDetailModal } from './CategoryDetailModal';
import { araceaeCategoryDataByLocale } from './data';
import type { Locale } from 'src/shared/config';

interface AraceaeCategoryModalProps {
  readonly locale: Locale;
  readonly onClose: () => void;
}

export const AraceaeCategoryModal = ({ locale, onClose }: AraceaeCategoryModalProps) => (
  <CategoryDetailModal data={araceaeCategoryDataByLocale[locale]} onClose={onClose} />
);
