// Unit Tests Module
const testResults = [];

function test(name, fn) {
  try {
    fn();
    testResults.push({ name, passed: true });
    console.log(`✅ ${name}`);
  } catch (error) {
    testResults.push({ name, passed: false, error: error.message });
    console.error(`❌ ${name}: ${error.message}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected} but got ${actual}`);
  }
}

// Address Validation Tests
test('valid address passes', () => {
  const result = validateAddress('0x742d35Cc6634C0532925a3b8D4C9b7c1b5c0e123');
  assert(result.valid, 'Should be valid');
});

test('invalid address fails', () => {
  const result = validateAddress('not-an-address');
  assert(!result.valid, 'Should be invalid');
});

test('address without 0x fails', () => {
  const result = validateAddress('742d35Cc6634C0532925a3b8D4C9b7c1b5c0e123');
  assert(!result.valid, 'Should fail without 0x');
});

// Utility Function Tests
test('formatEth converts wei correctly', () => {
  const result = formatEth('1000000000000000000');
  assertEqual(result, '1.0000', 'Should be 1.0000 ETH');
});

test('shortenAddress works correctly', () => {
  const addr = '0x742d35Cc6634C0532925a3b8D4C9b7c1b5c0e123';
  const result = shortenAddress(addr, 4);
  assert(result.includes('...'), 'Should contain ...');
  assert(result.length < addr.length, 'Should be shorter');
});

test('isValidAddress returns true for valid', () => {
  assert(
    isValidAddress('0x742d35Cc6634C0532925a3b8D4C9b7c1b5c0e123'),
    'Valid address should return true'
  );
});

test('isValidAddress returns false for invalid', () => {
  assert(!isValidAddress('0xinvalid'), 'Invalid should return false');
});

function runTests() {
  testResults.length = 0;
  const passed = testResults.filter(t => t.passed).length;
  const failed = testResults.filter(t => !t.passed).length;
  console.log(`\nTests: ${passed} passed, ${failed} failed`);
  return { passed, failed, total: testResults.length };
}

document.addEventListener('DOMContentLoaded', runTests);