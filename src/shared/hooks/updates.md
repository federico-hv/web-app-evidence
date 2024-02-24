# Updates

This document outlines the hooks that are to be removed from the code base. The hooks will either be deprecated or moved.


The following hooks are going to be moved to the component library:

* useRecordState
* useCounter
* useDimensions
* useGeneralContext
* useInterval
* useScrollDirection
* useScrollPosition
* useToast
* useAlertDialog

The following hooks are going to be deprecated from this directory: 

* useCircularCount
* usePrevPath
* useMenuNavigate
* useNavigateWithPreviousLocation


The following hooks are going to be moved to another directory:

* useProfile -> `features/users/shared/hooks`