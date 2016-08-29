#include <stdio.h>

int main(void) {
	int c;
	printf("char *cset = \"");
	for (c = 'A'; c <= 'Z'; c++) printf("%c",c);
	for (c = 'a'; c <= 'z'; c++) printf("%c",c);
	for (c = '0'; c <= '9'; c++) printf("%c",c);
	printf("-_\";\n");
	return 0;
}
