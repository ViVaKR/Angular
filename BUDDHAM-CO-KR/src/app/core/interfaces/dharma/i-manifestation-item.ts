export interface IManifestationItem {

    kind: string;
    sang: string;
    image?: string;
    label?: string;
    attributes?: Record<string, unknown>;
}
