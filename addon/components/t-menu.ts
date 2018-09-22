import BaseTransformiconComponent from './-private/base';
import { get } from '@ember/object';
import { className, layout } from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';
import { alias } from '@ember-decorators/object/computed';
import _defaultTo from 'lodash.defaultto';
// NOTE: https://github.com/typed-ember/ember-cli-typescript/issues/242
// @ts-ignore: Ignore import of compiled template
import template from '../templates/components/t-menu';

const DEFAULT_ANIMATION = 'butterfly';

type Animation = 'butterfly'|'minus'|'x-cross'|'arrow-up'|'arrow-360-left'|'arrow-left';

/**
  Menu Transformicon

  PUBLIC
    * `animation` string - Set the menu animation type  (alias: `a`).
      * types - `butterfly` | `minus` | `x-cross` | `arrow-up` | `arrow-360-left` | `arrow-left`
    * `is-open` boolean - Set initial open menu state.
    * `onclick` closure action - The name of your consuming application's component/controller/route action to handle the transformicon click. Returned with 1 parameter `isOpen`, which is a boolean type indicating if the current state is open or closed.

  ```hbs
    {{! These are functionally equivalent}}
    <TMenu />
    <TMenu @a='butterfly' />
    <TMenu @animation='butterfly' />
    <TMenu @is-open={{false}} @animation='butterfly' />
  ```
*/
@layout(template)
export default class TMenuComponent extends BaseTransformiconComponent {
  label = 'toggle menu';

  /**
   * Animation CSS classname lookup table for the Menu transformicon
   */
  _animationTypeTable = {
    'butterfly': 'tcon-menu--xbutterfly',
    'minus': 'tcon-menu--minus',
    'x-cross': 'tcon-menu--xcross',
    'arrow-up': 'tcon-menu--arrow tcon-menu--arrowup',
    'arrow-360-left': 'tcon-menu--arrow tcon-menu--arrow360left',
    'arrow-left': 'tcon-menu--arrow tcon-menu--arrowleft'
  };

  /**
   * Get the component's current animation type. This is used to lookup the CSS classname for the
   * animation
   */
  animation: Animation = _defaultTo(this.animation, DEFAULT_ANIMATION);

  /**
   * Flag to indicate the state of this transformicon
   */
  // 'is-open' = _defaultTo(this['is-open'], false);
  'is-open': boolean;

  /**
   * Alias for {@link animation}
   */
  @alias('animation') a?: Animation;

  constructor() {
    super(...arguments);

    // NOTE: ESDoc does not currently support parsing a quoted and dasherized class field. Adding
    // here from the constructor as a temporary workaround.
    // https://github.com/esdoc/esdoc/issues/519#issuecomment-417895936
    this['is-open'] = _defaultTo(this['is-open'], false);
  }

  /**
   * Get the CSS classname corresponding to the component's current {@link animation} type
   */
  @className
  @computed('animation')
  get animationType(): string {
    let anim = get(this, 'animation');
    return get(this._animationTypeTable, anim);
  }

  /**
   * Get the {@link transformClass} CSS classname representing the `is-open` toggled state
   * for this transformicon
   */
  @className
  @computed('is-open')
  get isOpen(): string|boolean {
    return get(this, 'is-open') ? get(this, 'transformClass') : false;
  }
}
