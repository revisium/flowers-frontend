export interface CategoryTrait {
  readonly body: string;
  readonly image: string;
}

export interface CategoryPlant {
  readonly image: string;
  readonly name: string;
}

export interface CategoryOrigin {
  readonly mapImage: string;
  readonly text: string;
}

export interface CategoryDetailData {
  readonly title: string;
  readonly latinName: string;
  readonly description: string;
  readonly heroImage: string;
  readonly heroPosition?: ResponsiveString;
  readonly heroSize?: ResponsiveString;
  readonly origin: CategoryOrigin;
  readonly traits: readonly CategoryTrait[];
  readonly facts: readonly string[];
  readonly collectionTitle: string;
  readonly collectionPlants: readonly CategoryPlant[];
  readonly closingNote: string;
}

type ResponsiveString =
  | string
  | {
      readonly base?: string;
      readonly md?: string;
      readonly lg?: string;
      readonly xl?: string;
    };
