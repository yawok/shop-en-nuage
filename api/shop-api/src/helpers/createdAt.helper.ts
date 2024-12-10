export function addCreatedAt(next: Function, entity: any) {
	entity.createdAt = new Date().toTimeString();
	next();
}
