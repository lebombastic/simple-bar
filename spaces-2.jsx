import Spaces from './lib/components/Spaces.jsx'

import { parseJson, getTheme } from './lib/utils.js'
import { getSettings } from './lib/settings.js'

import { styles } from './lib/styles/Styles.js'
import CustomStyles from './lib/styles/CustomStyles.js'

const refreshFrequency = false

const settings = getSettings()

const theme = getTheme(settings)
const Styles = styles[theme]

const className = `
  ${Styles.BaseStyles}
  ${Styles.SpacesStyles}

  ${settings.global.floatingBar ? Styles.FloatingBarOverride : ''}
  ${settings.global.noBarBg ? Styles.NoBarBgOverride : ''}
  ${settings.global.bottomBar ? Styles.BottomBarOverride : ''}
  ${settings.global.floatingBar && settings.global.bottomBar ? Styles.FloatinBottomBarOverride : ''}

  ${CustomStyles}
`

const command = 'bash simple-bar/lib/scripts/get_spaces.sh'

const render = (state) => {
  const { output, error } = state
  if (error) {
    return (
      <div className="simple-bar simple-bar--spaces simple-bar--empty">
        <span>simple-bar-spaces.jsx: Something went wrong...</span>
      </div>
    )
  }
  if (!output) {
    return (
      <div className="simple-bar simple-bar--spaces simple-bar--loading simple-bar--empty">
        <span>simple-bar-spaces.jsx: Loading...</span>
      </div>
    )
  }
  const data = parseJson(output)
  if (!data) {
    return (
      <div className="simple-bar simple-bar--spaces simple-bar--empty">
        <span>simple-bar-spaces.jsx: JSON error...</span>
      </div>
    )
  }
  return (
    <div className="simple-bar simple-bar--spaces">
      <Spaces output={data.spaces} SIP={data.SIP} displayId={2} />
    </div>
  )
}

export { command, refreshFrequency, className, render }
