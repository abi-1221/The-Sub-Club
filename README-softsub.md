# SoftSub Hub - Customization Guide

This guide explains how to customize the SoftSub Hub storefront.

## 1. Product Catalog & Prices
Currently, this storefront fetches products dynamically from the **Saleor GraphQL API**. 
There is no local JSON file for products in this version.

**To edit products and prices:**
1.  **Connect your own backend**: Update the `NEXT_PUBLIC_SALEOR_API_URL` in `.env.local` to point to your own Saleor instance.
2.  **Manage Data**: Use your **Saleor Dashboard** to add products, set prices (in INR), and manage descriptions.
    *   *Note*: The "Best for" text in the product page is currently hardcoded in `src/app/[channel]/(main)/products/[slug]/page.tsx`.

## 2. Branding (Name & Tagline)
You can change the site name and tagline in the following files:

*   **Header Logo & Tagline**: 
    *   File: `src/ui/components/Logo.tsx`
    *   Edit the `companyName` variable and the tagline text inside the `<span>` tag.
*   **SEO Title & Meta Description**: 
    *   File: `src/app/layout.tsx`
    *   Update the `metadata` object (title and description).
*   **Footer Copyright**:
    *   File: `src/ui/components/Footer.tsx`

## 3. WhatsApp Integration
To change the phone number and default message:

*   **File**: `src/app/[channel]/(main)/products/[slug]/AddButton.tsx`
*   **Action**: 
    *   Update `phoneNumber` with your actual WhatsApp number (format: `91XXXXXXXXXX`).
    *   Edit the `message` variable to change the pre-filled text template.

## 4. Environment Variables
The application configuration is located in `.env.local`.

*   `NEXT_PUBLIC_SALEOR_API_URL`: The GraphQL endpoint of your Saleor backend.
*   `NEXT_PUBLIC_STOREFRONT_URL`: The public URL of your website (used for SEO/Metadata).
