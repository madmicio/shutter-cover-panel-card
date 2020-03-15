# NOTE: need in "your-theme.yaml"
```yaml
#button
  active-background-button-color: '#0080ff'
  deactive-background-button-color: "#f2f0fa"
  button-border-standard: rgba(0, 128, 255, .5)
  state-icon-active-color: "#0080ff"
```
# Shutter Cover Panel Card
![all](example.JPG)


# locelace config example

```yaml
- type: 'custom:shutter-cover-panel-card'
  title: Tapparelle
  icon: 'mdi:window-shutter'
  showbackButton: no_show
  # covercolor: red
  buttonText: Tapparelle
  backbuttonText: casa
  buttonPath: /lovelace/0
  # background: transparent
  innershadow: noenable
  softui: noenable
  entities:
    - entity: cover.salone
      name: Salone
    - entity: cover.veneziana
    - entity: cover.porta_cucina
      name: Porta Cucina
    - entity: cover.cucina
      name: Cucina
    - entity: cover.sofia
      name: Sofia
    - entity: cover.camera_matrimoniale
      name: Matrimoniale
    - entity: cover.emma
      name: Emma
  buttons:
    - entity: automation.chiusura_tapparella_alba
      name: chiususa alba
      icon: 'mdi:sunrise'
      cardtype: button
    - entity: automation.chiusura_tapparelle_invernale
      name: chiusura invernale
      icon: 'mdi:sunset'
      cardtype: button
  script:
    - entity: script.apri_tutto
      name: apri
      icon: 'mdi:open'
    - entity: script.chiudi_tutto
      name: chiudi
      icon: 'mdi:close'
  prova:
    - entity: script.apri_tutto
      name: Apri Tutto
      label: tapparelle
      icon: 'mdi:window-shutter-open'
      cardtype: script
    - entity: script.chiudi_tutto
      name: Chiudi Tutto
      label: tapparelle
      icon: 'mdi:window-shutter'
      cardtype: script
    - entity: automation.chiusura_tapparella_alba
      name: chiusura invernale
      label: automazione
      icon: 'mdi:weather-sunset-up'
      cardtype: button
    - entity: automation.chiusura_tapparelle_invernale
      name: chiusura invernale
      label: automazione
      icon: 'mdi:weather-sunset-down'
      cardtype: button
```


## Install

### Manual install

1. Download and copy `soft-ui-general-card.js` from (https://https://github.com/madmicio/soft_ui) into your `config/www` directory.

2. Add a reference to `soft-ui-general-cardl.js` inside your `ui-lovelace.yaml` or at the top of the *raw config editor UI*:

  ```yaml
  resources:
    - url: /local/soft-ui-general-card.js
      type: module
  ```

### Main Options
| Name | Type | Default | Supported options | Description |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type` | string | **Required** | `custom:soft-ui-general_card` | Type of the card |
| `entities` | string | **Required** | entity | list of entitity |
| `innershadow` | object list | optional | enable/disable | enable - disable innershadow in the card |
| `iconemboss` | object | optional | enable/disable | enable - disable icon emboss effect |

### entity Options
| Name | Type | Default | Supported options | Description |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entities` | string | optional | `sensor.ac` | entity_id |
| `name` | string | optional | `External temperature` | Define the name of the sensor |
| `icon` | string | optional | `mdi:icon` | Icon to display. Will be overriden by the icon defined in a state |
| `type` | string | **Required** | sensor / button | define the card style and function. in sensor mode return the sensor information, 
in button mode the icon becomes a button to activate / deactivate the entity |
