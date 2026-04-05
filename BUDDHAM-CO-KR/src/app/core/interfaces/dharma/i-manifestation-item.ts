export interface IManifestationItem {

    kind: string;
    sang: string;
    url: string;
    image?: string;
    label?: string;
    attributes?: Record<string, unknown>;

}
