import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = await readFile(
  new URL('../lib/payments/stripe.ts', import.meta.url),
  'utf8'
);

test('preserves Stripe checkout behavior', () => {
  assert.match(source, /createCheckoutSession/);
  assert.match(source, /success_url/);
  assert.match(source, /cancel_url/);
  assert.match(source, /client_reference_id/);
});

test('preserves subscription management behavior', () => {
  assert.match(source, /createCustomerPortalSession/);
  assert.match(source, /handleSubscriptionChange/);
  assert.match(source, /updateTeamSubscription/);
  assert.match(source, /return_url/);
});

test('preserves product and price retrieval', () => {
  assert.match(source, /getStripePrices/);
  assert.match(source, /getStripeProducts/);
});
