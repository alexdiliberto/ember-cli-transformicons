import BaseTransformiconComponent from './-private/base';
import { get } from '@ember/object';
import { className, classNames, layout } from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';
import { alias } from '@ember-decorators/object/computed';
import _defaultTo from 'lodash.defaultto';
import template from '../templates/components/t-remove';

const defaultAnimation = 'check';

/**
  Transformicon Remove component.

  PUBLIC - Optional parameters:
    * `animation` string - Set the menu animation type.
    * `a` string - Shorthand alias for `animation`.
    * `is-removed` boolean - Set initial open removed state.
    * `onclick` closure action - The name of your consuming application's component/controller/route action to handle the transformicon click. Returned with 1 parameter `isRemoved`, which is a boolean type indicating if the current state is pending remove.

  Available `animation` types:
    * check
    * chevron-left
    * chevron-right
    * chevron-down
    * chevron-up

  Examples:

    ```hbs
      {{! These are functionally equivalent}}

      {{t-remove}}
      {{t-remove a='check'}}
      {{t-remove animation='check'}}
      {{t-remove is-removed=false animation='check'}}
    ```

  @class TRemoveComponent
  @extends BaseTransformiconComponent
  @public
*/
@layout(template)
@classNames('tcon-remove')
export default class TRemoveComponent extends BaseTransformiconComponent {
  label = 'remove item';
  initialState = 'is-removed';

  animationTypeTable = {
    'check': 'tcon-remove--check',
    'chevron-left': 'tcon-remove--chevron-left',
    'chevron-right': 'tcon-remove--chevron-right',
    'chevron-down': 'tcon-remove--chevron-down',
    'chevron-up': 'tcon-remove--chevron-up'
  }

  /*
    PUBLIC COMPONENT API
  */
 animation = _defaultTo(this.animation, defaultAnimation);
 'is-removed' = _defaultTo(this['is-removed'], false);
  @alias('animation') a;

  /**
    Get the CSS classname corresponding to the component's current animation type.

    @property animationType
    @type String
    @public
  */
  @className
  @computed('animation')
  get animationType() {
    let anim = get(this, 'animation');
    return get(this.animationTypeTable, anim) || get(this.animationTypeTable, defaultAnimation);
  }

  /**
    Get the classname representing the `remove` toggled state for the remove icon. This classname is stored in the `BaseTransformiconComponent`.

    @property isRemoved
    @type String|Boolean
    @public
  */
  @className
  @computed('is-removed')
  get isRemoved() {
    return get(this, 'is-removed') ? get(this, 'transformClass') : false;
  }
}