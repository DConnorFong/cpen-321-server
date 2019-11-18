export async function hasAGroup(component) {
    if (component.props.children.length < 1) {
        throw new Error(`No group for current user`);
    }
}

export async function hasCourses(component) {
    if (component.props.children.length == 0) {
        throw new Error(`No courses for current user`);
    }
}
