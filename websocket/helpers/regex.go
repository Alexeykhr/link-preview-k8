package regex

import (
	"regexp"
)

var domainRegex, _ = regexp.Compile("^((?:(?:(?:\\w[.\\-+]?)*)\\w)+)((?:(?:(?:\\w[.\\-+]?){0,62})\\w)+)\\.(\\w{2,6})$")

func IsValidDomain(str string) bool {
	return domainRegex.MatchString(str)
}
