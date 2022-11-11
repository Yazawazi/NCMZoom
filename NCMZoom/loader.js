plugin.onLoad(async plugin => {
    document.addEventListener("wheel", async event => {
        if (event.ctrlKey) {
            const oldZoom = document
                .querySelector(":root")
                .style
                .getPropertyValue("--ncmzoom")
            const zoom =
                oldZoom !== ""
                    ? parseFloat(oldZoom)
                    : 1.0
            const newZoom = event.deltaY < 0 ? zoom + 0.1 : zoom - 0.1
            document
                .querySelector(":root")
                .style
                .setProperty("--ncmzoom", newZoom)
            plugin.setConfig("zoom", newZoom)
        }
    })
})

plugin.onAllPluginsLoaded(async plugins => {
    await plugins.StylesheetLoader.loadStylesheet(
        plugin,
        this.pluginPath + "/ncmzoom.css", "ncmzoom",
        {
            zoom: {
                name: "缩放",
                key: "--ncmzoom",
                reflect: "cssVar",
                type: "cssInput",
                default: "1.0"
            }
        }
    )
})
