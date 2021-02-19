from robot.api.deco import keyword
from REST import REST


class RESTorNull(REST):
    """ Extends the RESTinstance library by adding <Type>_or_null assertions """

    def _or_null_assert(self, field, normal_type, *enum, **validations):
        values = []
        for found in self._find_by_field(field):
            schema = found["schema"]
            reality = found["reality"]
            skip = self._input_boolean(validations.pop("skip", False))
            self._set_type_validations(normal_type, schema, validations)
            schema = {"anyOf": [{"type": "null"}, schema]}

            if enum:
                if "enum" not in schema:
                    schema["enum"] = []
                for value in enum:
                    value = self._input_number(value)
                    if value not in schema["enum"]:
                        schema["enum"].append(value)
            elif self._should_add_examples():
                schema["examples"] = [reality]
            if not skip:
                self._assert_schema(schema, reality)
            values.append(reality)
        return values

    @keyword(name="Number or null", tags=("assertions",))
    def number_or_null(self, field, *enum, **validations):
        self._or_null_assert(field, 'number', *enum, **validations)

    @keyword(name="Integer or null", tags=("assertions",))
    def integer_or_null(self, field, *enum, **validations):
        self._or_null_assert(field, 'integer', *enum, **validations)

    @keyword(name="String or null", tags=("assertions",))
    def string_or_null(self, field, *enum, **validations):
        self._or_null_assert(field, 'string', *enum, **validations)

    @keyword(name="Array or null", tags=("assertions",))
    def array_or_null(self, field, *enum, **validations):
        self._or_null_assert(field, 'array', *enum, **validations)

    @keyword(name="Object or null", tags=("assertions",))
    def object_or_null(self, field, *enum, **validations):
        self._or_null_assert(field, 'object', *enum, **validations)

    @keyword(name="Boolean or null", tags=("assertions",))
    def boolean_or_null(self, field, *enum, **validations):
        self._or_null_assert(field, 'boolean', *enum, **validations)
