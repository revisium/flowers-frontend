import type { Locale } from 'src/shared/config';

import { CategoryDetailModal } from '../CategoryDetailModal/CategoryDetailModal';
import { araceaeCategoryDataByLocale } from './data';

interface AraceaeCategoryModalProps {
  readonly locale: Locale;
  readonly onClose: () => void;
}

export const AraceaeCategoryModal = ({ locale, onClose }: AraceaeCategoryModalProps) => (
  <CategoryDetailModal data={araceaeCategoryDataByLocale[locale]} onClose={onClose} />
);
