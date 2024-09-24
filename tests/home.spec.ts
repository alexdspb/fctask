import { test, expect } from '@playwright/test';

const loginCredentials = {
    email: '',
    password: '',
};

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:3000');
});

test.describe('The App', () => {
    test('should have a heading and a form with its inputs', async ({page}) => {
        await expect(page.getByRole('heading', {name: 'Sign In'})).toBeVisible();

        await expect(page.getByTestId('loginForm')).toBeVisible();

        const emailInput = await page.getByRole('textbox', {name: 'Email'});
        await expect(emailInput).toBeVisible();
        await expect(emailInput).toHaveValue('');

        const passwordInput = await page.getByRole('textbox', {name: 'Password'});
        await expect(passwordInput).toBeVisible();
        await expect(passwordInput).toHaveValue('');

        await expect(page.getByRole('button', {name: 'Sign In'})).toBeVisible();
    });

    test('should send filled form and display the user info', async ({page}) => {
        const emailInput = await page.getByTestId('emailInput');
        const passwordInput = await page.getByTestId('passwordInput');
        const button = page.getByRole('button', {name: 'Sign In'});

        await emailInput.fill(loginCredentials.email);
        await passwordInput.fill(loginCredentials.password);
        await button.click();

        await expect(page.getByRole('heading', {name: 'User Profile'})).toBeVisible();
        await expect(page.getByTestId('userForm')).toBeVisible();
        await expect(page.getByTestId('firstNameInput')).not.toHaveValue('');
        await expect(page.getByTestId('lastNameInput')).not.toHaveValue('');
    });
});
