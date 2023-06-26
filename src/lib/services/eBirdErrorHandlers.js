import { postErrorText, postStatus } from '$lib/store';
import { _ } from '$lib/services/i18n';
import { get } from 'svelte/store';
import dayjs from 'dayjs';

export function ebirdErrorHandlers(checklistInfo, times) {
	// eBird Error Handling
	if (checklistInfo.ok === false) {
		postErrorText.set(get(_)('invalid_checklist_id'));
		// $postErrorText = $_('invalid_checklist_id');
		postStatus.set('error');
		// $postStatus = 'error';
		return true;
	}

	// Historical Checklists Error
	if (checklistInfo.obsTimeValid === false) {
		postErrorText.set(get(_)('submitted.historical_checklist_error'));
		// $postErrorText = $_('submitted.historical_checklist_error');
		// $postStatus = 'error';
		postStatus.set('error');

		return true;
	}
	if (dayjs(times.start.localTime).get('year') < 1979) {
		postErrorText.set(get(_)('submitted.too_old_checklist_error'));
		// $postErrorText = $_('submitted.too_old_checklist_error');
		// $postStatus = 'error';
		postStatus.set('error');
		return true;
	}
}
