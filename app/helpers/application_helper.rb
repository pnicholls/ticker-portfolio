module ApplicationHelper
  def form_group(object, attribute)
    klass = 'form-group'
    klass += ' errored' if object.errors.messages[attribute].any?
    klass
  end
end
