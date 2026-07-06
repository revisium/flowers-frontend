# Add Page Playbook

1. Write or update a page spec (once a product spec doc exists; skip if none
   is tracked yet).
2. Add the route to `src/routes.ts`.
3. Create a page slice under `src/pages/<PageName>/`.
4. Put mock/API access in a DataSource (once ViewModels/DataSources are in
   use; this bootstrap stage has neither yet).
5. Put state, actions, and derived display values in a ViewModel.
6. Keep React views thin.
7. Update `docs/README.md`'s page list if one exists, or skip if not yet
   tracked.
8. Run `npm run verify`.
