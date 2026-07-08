import type { Locale } from 'src/shared/config';
import { GreenhouseMenu } from 'src/widgets/GreenhouseMenu';

import type { HomeCopy } from '../../model/homePageData';

interface HomeHeaderProps {
  readonly locale: Locale;
  readonly text: HomeCopy;
  readonly onLocaleChange: (locale: Locale) => void;
}

export const HomeHeader = ({ locale, onLocaleChange, text }: HomeHeaderProps) => {
  return (
    <GreenhouseMenu
      languageLabel={text.languageLabel}
      locale={locale}
      logoTone="dark"
      searchLabel={text.searchLabel}
      searchPlaceholder={text.searchPlaceholder}
      onLocaleChange={onLocaleChange}
    />
  );
};
