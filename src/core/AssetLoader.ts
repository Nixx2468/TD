export class AssetLoader {
  private images = new Map<string, HTMLImageElement>();

  async load(manifest: Record<string, string>): Promise<void> {
    const entries = Object.entries(manifest);
    await Promise.all(
      entries.map(([key, src]) =>
        new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => { this.images.set(key, img); resolve(); };
          img.onerror = () => { console.warn(`Asset not found: ${src}`); resolve(); };
          img.src = src;
        })
      )
    );
  }

  get(key: string): HTMLImageElement | null {
    return this.images.get(key) ?? null;
  }
}
