# Project Listing Page Specification

## ADDED Requirements

### Requirement: Project Listing Route
The system SHALL provide a project listing page accessible at `/projects` that displays all projects.

#### Scenario: Access project listing page
- **WHEN** a user navigates to `/projects`
- **THEN** the system displays a page with all projects

#### Scenario: Static page generation
- **WHEN** the application is built for production
- **THEN** the project listing page is generated as a static page (SSG)

### Requirement: Projects Display
The system SHALL display all projects as cards in a responsive grid layout.

#### Scenario: Projects grid display
- **WHEN** the project listing page loads
- **THEN** all projects are displayed in a grid with:
  - Title, description, technologies
  - Thumbnail image (if available)
  - Featured badge (if project is featured)
  - Responsive grid: 1 column on mobile, 2 columns on tablet, 3 columns on desktop

#### Scenario: Featured projects first
- **WHEN** some projects are marked as featured
- **THEN** featured projects appear before non-featured projects in the grid

#### Scenario: Empty state handling
- **WHEN** no projects exist
- **THEN** the page displays a message: "No projects yet. Check back soon!"

### Requirement: Project Card Navigation
The system SHALL make each project card clickable, navigating to the corresponding project detail page.

#### Scenario: Navigate to project detail
- **WHEN** a user clicks on a project card
- **THEN** the system navigates to `/projects/[slug]` for that project

#### Scenario: Card hover interaction
- **WHEN** a user hovers over a project card
- **THEN** the card displays visual feedback (shadow, scale, or color change)

### Requirement: Project Listing Page Layout
The system SHALL provide a page layout with header, projects grid, and responsive design.

#### Scenario: Page header
- **WHEN** the project listing page loads
- **THEN** the page displays:
  - Page title "Projects" as h1 heading
  - Optional subtitle describing the portfolio
  - Breadcrumb or back navigation to homepage

#### Scenario: Responsive layout
- **WHEN** the project listing page is viewed on different devices
- **THEN** the layout adapts: mobile (1 column), tablet (2 columns), desktop (3 columns)

### Requirement: Project Listing Metadata
The system SHALL generate SEO metadata for the project listing page including title, description, and Open Graph tags.

#### Scenario: SEO metadata generation
- **WHEN** the project listing page is accessed
- **THEN** the page includes:
  - Title tag: "Projects | Casper Damen"
  - Meta description summarizing project portfolio
  - Open Graph tags for social sharing
  - Canonical URL

### Requirement: Projects Data Fetching
The system SHALL provide a CMS utility function to fetch all projects.

#### Scenario: Fetch all projects
- **WHEN** `getAllProjects()` is called
- **THEN** the function returns an array of all projects

#### Scenario: Featured projects sorting
- **WHEN** `getAllProjects()` is called
- **THEN** featured projects appear first in the returned array

#### Scenario: Handle empty projects
- **WHEN** `getAllProjects()` is called and no projects exist
- **THEN** the function returns an empty array
