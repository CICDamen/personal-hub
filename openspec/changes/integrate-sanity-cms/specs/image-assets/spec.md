# Capability: Image Assets

## ADDED Requirements

### Requirement: Sanity Image URL Builder
The system SHALL provide an image URL builder that generates optimized image URLs from Sanity image references.

#### Scenario: Build image URL from Sanity reference
- **WHEN** a Sanity image reference is provided
- **THEN** the system uses `@sanity/image-url` to build a CDN URL
- **AND** the URL points to the Sanity CDN with the project ID
- **AND** the image URL includes transformation parameters

#### Scenario: Configure image dimensions
- **WHEN** building an image URL with specific dimensions
- **THEN** the image builder applies width and height parameters
- **AND** the Sanity CDN returns an image resized to the specified dimensions
- **AND** maintains aspect ratio unless explicitly overridden

### Requirement: Image Format Optimization
The system SHALL request optimized image formats from Sanity CDN based on browser capabilities.

#### Scenario: Auto format selection
- **WHEN** requesting an image from Sanity CDN
- **THEN** the system requests `auto` format
- **AND** Sanity CDN automatically selects WebP or AVIF for supported browsers
- **AND** falls back to JPEG/PNG for unsupported browsers

#### Scenario: Quality optimization
- **WHEN** building image URLs
- **THEN** the system can specify quality parameters
- **AND** Sanity CDN compresses images to the requested quality level
- **AND** balances file size and visual quality

### Requirement: Responsive Image Support
The system SHALL generate multiple image sizes for responsive layouts using Sanity CDN transformations.

#### Scenario: Generate srcset for responsive images
- **WHEN** a component needs responsive images
- **THEN** the system generates multiple image URLs with different widths
- **AND** creates a srcset attribute with the various sizes
- **AND** allows the browser to select the appropriate image size
- **AND** reduces bandwidth for mobile users

#### Scenario: Integration with Next.js Image component
- **WHEN** using Next.js Image component with Sanity images
- **THEN** the system provides a custom loader function
- **AND** the loader uses Sanity CDN for image transformations
- **AND** Next.js handles lazy loading and placeholder generation
- **AND** maintains accessibility with proper alt text from Sanity

### Requirement: Image Metadata Handling
The system SHALL extract and utilize image metadata from Sanity image references.

#### Scenario: Extract alt text from image reference
- **WHEN** an image reference includes alt text
- **THEN** the system extracts the alt text field
- **AND** passes it to the image component for accessibility
- **AND** provides a fallback if alt text is missing

#### Scenario: Handle image dimensions
- **WHEN** an image reference includes dimension metadata
- **THEN** the system extracts width and height values
- **AND** provides dimensions to Next.js Image for layout shift prevention
- **AND** calculates aspect ratio for responsive sizing

### Requirement: Hotspot and Crop Support
The system SHALL respect hotspot and crop metadata from Sanity image references for proper image framing.

#### Scenario: Apply crop parameters
- **WHEN** a Sanity image includes crop metadata
- **THEN** the image URL builder applies the crop rectangle
- **AND** Sanity CDN returns the cropped image
- **AND** maintains the editor's intended framing

#### Scenario: Apply hotspot for focal point
- **WHEN** a Sanity image includes hotspot metadata
- **THEN** the image URL builder applies focal point parameters
- **AND** ensures the important area remains visible when resizing
- **AND** crops intelligently around the focal point

### Requirement: Placeholder Image Generation
The system SHALL generate low-quality image placeholders (LQIP) for improved perceived performance.

#### Scenario: Generate blur placeholder
- **WHEN** loading an image with Next.js Image component
- **THEN** the system requests a low-quality version from Sanity CDN
- **AND** uses it as a blur placeholder
- **AND** displays the placeholder while the full image loads
- **AND** smoothly transitions to the full image once loaded

### Requirement: Image URL Caching
The system SHALL cache constructed image URLs to avoid redundant URL builder operations.

#### Scenario: Reuse constructed URLs
- **WHEN** the same image is used multiple times
- **THEN** the image URL builder can cache the constructed URL
- **AND** reuses the cached URL for identical image references and parameters
- **AND** reduces computational overhead during rendering

### Requirement: Error Handling for Invalid Images
The system SHALL handle missing or invalid image references gracefully.

#### Scenario: Missing image reference
- **WHEN** an image reference is null or undefined
- **THEN** the system skips image rendering or uses a fallback
- **AND** does not crash the page
- **AND** logs a warning for debugging

#### Scenario: Invalid image asset
- **WHEN** a Sanity image reference points to a non-existent or deleted asset
- **THEN** Sanity CDN returns an error
- **AND** the system falls back to a placeholder or default image
- **AND** logs the error for investigation
