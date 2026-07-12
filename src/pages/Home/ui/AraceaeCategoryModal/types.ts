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
  readonly backLabel: string;
  readonly closingNote: string;
  readonly collectionPlants: readonly CategoryPlant[];
  readonly collectionTitle: string;
  readonly title: string;
  readonly latinName: string;
  readonly description: string;
  readonly facts: readonly string[];
  readonly factsTitle: string;
  readonly heroImage: string;
  readonly heroBlendMode?: 'multiply';
  readonly heroFilter?: string;
  readonly heroPosition?: ResponsiveString;
  readonly heroSize?: ResponsiveString;
  readonly origin: CategoryOrigin;
  readonly originTitle: string;
  readonly traits: readonly CategoryTrait[];
  readonly traitsTitle: string;
}

type ResponsiveString =
  | string
  | {
      readonly base?: string;
      readonly md?: string;
      readonly lg?: string;
      readonly xl?: string;
    };
