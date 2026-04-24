# ID PanoramSP Extensibility Library

Use this package to add custom views and layout templates to PanoramSP.

## Overview of Implementation Steps:

- Create a new SPFX Library Component
- Install this package:
  - `npm install @intelligent-decisioning/panoramsp-extensibility`
- Create a class that implements `IPanoramSPExtension`
- Ensure this class is exported in the library
- Build and deploy the library to your site
- Register the ComponentId of the library in PanoramSP, and your custom views and layouts should become available.

## Sample Implementation

Look at `src/libraries/panoramSpExtensions/SamplePanoramSpExtensionLibrary.ts` for an example implementation.

### HelloWorld Web Part

The HelloWorld Web Part in this solution is used as a reference implementation for rendering the options presented by the extensions. This is used by the team at Intelligent Decisioning when testing updates to this library before we update the main PanoramSP web part.