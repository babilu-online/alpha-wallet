export class AbstractManager {
  ctx

  id() {
    return "_default"
  }

  configure(ctx) {
    this.ctx = ctx
  }

  /**
   * Called before manager is removed from context
   */
  shutdown() {}

  getManager(id) {
    return this.ctx.getManager(id)
  }

  getStorageManager() {
    return this.getManager("storage_mgr")
  }

  getStore() {
    return this.getStorageManager().getWalletStore()
  }

}