import { GreenhouseMenu } from 'src/widgets/GreenhouseMenu';

export function HomeHeader() {
  return (
    <GreenhouseMenu
      languageLabel="Выбор языка"
      locale="ru"
      logoTone="dark"
      searchLabel="Поиск по названию растения"
      searchPlaceholder="Найти растение..."
    />
  );
}
