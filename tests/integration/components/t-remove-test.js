import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { percySnapshot } from 'ember-percy';

module('Integration | Component | t remove', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);

    await render(hbs`
      <TRemove />
    `);

    assert.dom('button').hasText('remove item');

    // Template block usage:
    await render(hbs`
      <TRemove>
        template block text
      </TRemove>
    `);

    assert.dom('button').hasText('remove item');
  });

  test('it creates a remove transformicon with defaults', async function(assert) {
    assert.expect(5);

    await render(hbs`
      <TRemove />
    `);
    percySnapshot(assert);

    assert.dom('button').hasAttribute('type', 'button');
    assert.dom('button').hasAttribute('aria-label', 'remove item');
    assert.dom('button').hasClass('tcon-remove');
    assert.dom('button').hasClass('tcon-remove--check');
    assert.dom('button').hasNoClass('tcon-transform');
  });

  test('it creates a remove transformicon with `isRemoved=true`', async function(assert) {
    assert.expect(1);

    await render(hbs`
      <TRemove @isRemoved={{true}} />
    `);
    percySnapshot(assert);

    assert.dom('button').hasClass('tcon-transform');
  });

  test('it creates a remove transformicon with a non-default animation `a="chevron-right"`', async function(assert) {
    assert.expect(1);

    await render(hbs`
      <TRemove @a="chevron-right" />
    `);

    assert.dom('button').hasClass('tcon-remove--chevron-right');
  });

  test('user can click on the transformicon', async function(assert) {
    assert.expect(2);

    await render(hbs`
      <TRemove id="t-remove" />
    `);

    assert.dom('#t-remove').hasNoClass('tcon-transform');

    await click('#t-remove');
    percySnapshot(assert);

    assert.dom('#t-remove').hasClass('tcon-transform');
  });
});
