/**
 * Created by mongolrgata
 */

define([], function () {
    //noinspection SpellCheckingInspection
    //var TEST_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAiD2lDQ1BpY2MAAGjerZpnUBXNt+57ZucMGzY5bDKbnHPOOUsOEjY5ZwQkK4iikqOIkkRQQEAUBURBRUEEFVQEFRUxYAQVRS7v/z1V59Stez/cqrumpvuZp7pXr+n69bcGQCQ1MjAqAWYBICo6Md7J3Iju7uFJxywDLGADFMAHpPwDE2KlosNSwf81Nh8B6J9+TvafXOD/LQhBzIRAACDsru4OjI1P3NWDuy81JTF2V8N3d332wFD/oF39fFfLxO8WCACC+I8f8K+m/6ND/tUq/+h4FyfjXW0BAJ0Y8j90wP/QgaHxUQCIuOyOF/23hv8EX8LuJsgyIyOZsq5KsgnxIQGJ8YFyYYGB/6NmfpAAnIA5MAKygAkidx/mrnIFSrttAogHISAAJO72gUAOhO22geD/cyQyUxP/6Y1jYtPiw0JCE+lKCoqqMnTT3bLpzokx0Uy6ZAozICEskalFD01MjNWSl48Oi2YGMUPimcyEAGZkTIpcYEyUvDadGeUfFqlF/+eHE/6ZaPB/GseQo7uEhiXQLY2N6bHxMcFhu8vsfkaGBTKjE5hB9KToIGY83Z9uHM/0TwxLZtKNY6KiYqIT6IaJifFhAUmJYTHRss6h/vFMw8iwCCZdWU6Bvic6NiY+cXeyzb9Z6JL/FJqwW2ngf2UJ/DeJXEx8iPx/LZUgH5Amm+Avv5tAPpIZ4h8ZGBPEZMj9sxf/cPu/85gQrKz0HwsiGgGAWtrZ+SYGAKYMgO1jOzu/m3Z2tk/t8rAIwGj0f8+POQmAxsauf+y/PdFGACj5AAzc+G8voAqAiwcB4HocmBSf/K/H8p/VAAyQAAXQAANwAA8IgAjIu6eJBbDunip2QAMcgAtwAx7Au3vCBIAgoAMhIAJEgRgQB5KAAaSA9C5LckAeKOxSpQxUgCpQBxpAE2gBbaAL9IA+MNjlzxiYANNdEi2AJbACNsAW2AF74LhLpzNwAXuAG3AHHsATeAMf4Av8gP8umYEgCATvMhq6y2bELrtRIBrEgLhdXhN2qU0GKSAVpIF0kAEywX6QDXJALsgDBeAAOAgKQREoBofBEVACjoHjoBSUgQpQCapANagFdaAeNIBGcBI0gVOgGbSAVtAG2kEHOAs6QRc4D7pBD+gFfaAfDICL4BK4DIbAFTAMRsAouAbGwA0wDibATXAbTII74C6YBvfADLgP5sAD8BDMgwXwGDwBi+AZWALPwQvwErwCr8Eb8BasgXfgA/gIPoHP4Av4Br6DTfAD/ARb4DfYBn/BDgRBMISEUBAGwkJ4iACRIDJEgVghKsQO0SBOiAvigXghfkgQokPCkAgkBolDkhADkoZkITlIAVKElCEVSA3SgDQhbUgH0oMMIEPIGDKFzCALyAqyhmwhe8gBcoJcoD2QG+QBeULekC+0F/KHAiEmFAKFQuFQJBQNxUBxUAKUBCVDqdA+KAPaD2VBOVAeVAAdhIqgQ9BhqAQ6BpVC5VAlVAXVQHVQA9QINUGnoRaoDToDnYU6oXNQN9QL9UED0CB0GboCDUOj0Bh0A5qAbkGT0F1oGpqBZqEH0CNoAXoCLUJL0AtoBXoNrUJr0HvoI/QJ+gJ9gzagn9AW9Af6CwMYhpEwBsbBBJgEU2AqzA5zwFwwD8wPC8JCsAgsBkvCUrAMLAcrwsqwKqwBa8E6sB5sCBvDprAFbAXbwPawI+wMu8LusCfsA/vB/nAQHAyHwRFwFBwLx8NJcAqcBmfA++EcOA8+ABfCxfAR+BhcClfAVXAtXA83wk1wM9wKn4HPwufgbvgC3A8PwkPwVXgUHoPH4VvwJDwF34Nn4YfwPPwEfgYvwy/hV/Aq/A7+AH+Cv8Ib8A94C96GdxAwAoXAIvAIEoIFwYagIbgQvAgBBB0hghBHMBAyCDmEIkIFoY7QQugi9BFGCFOEBcIaYYdwRLggXBEeCG+EHyIAwUSEIiIQ0Yg4RCIiBbEPkYnIRuQiChCFiGJECeI4ohxRjahDnEA0IZoRbYgORBeiG3EBMYC4hLiCGEGMIcYRtxF3EfcQs4iHiAXEU8Qy4iXiNeIt4j1iHfEVsYH4ifiN+IuEkSgkFklAUpBUJA3JheRDCiKFkWJIBlIGKY9URqohNZG6SAOkMdIcaYW0RToiXZBuSC+kLzIAyUSGIiORMcgEZDIyDZmJzEbmIw8ii5ElyFJkBbIGWY88iTyNbEN2IM8he5D9yEHkFeQI8jpyAjmJnEbeRz5ELiAXkc+RK8hV5DvkOvIrcgP5C7mNAigkCosioCgoNhQHigclgBJGiaEYKFmUIkoFpYHSQRmgjFHmKGuUPcoJ5YryRPmiAlDBqDBUFCoOlYRKQ2WiclD5qELUYdQxVDmqGlWPOolqRrWjOlHnURdQF1FDqBHUddRN1B3UPdQcah71FLWMWkGtot6jPqG+o36i/qABGonGooloFjQ7mgvNhxZCi6EZaFm0IloVrYnWQxuhzdBWaDu0M9oN7YX2QweiQ9GR6Fh0IjoNnYnOQRegD6FL0KXoKnQduhHdjG5Hd6J70P3oS+hh9Bh6An0HfQ/9AL2AXkS/QL9Gv0Ovo7+if6B/YwAGicFhSBgqhgPDixHEiGIkMbIYRYwaRgujjzHGWGBsMY4YV4wnxg8TiAnFRGHiMMmYdEwWJh9ThDmCKcVUYeowJzEtmDOYc5gLmIuYK5hrmAnMJOYe5gHmMeYZ5iVmFfMB8wWzgdnC7GCRWByWhKViObF8WCGsOFYaK49VwWpi9bDGWAusLdYJ64b1xvpjg7ER2FhsEnYfNgubjy3ClmDLsNXYBuwpbBu2E9uDHcAOYUex49hJ7D3sA+xj7DL2FXYNu479hv2J3cYhcFgcCUfFceL4ccI4CZwMThGnjtPBGeLMcDY4R5wrzgvnjwvGReDicMm4dFwO7gCuGHccV4mrwzXhWnFncT24AdwV3DXcBO4u7j5uHreIe4lbxX3EfcX9xG3jYTwWT8Kz4bnxAnhRPAMvj1fBa+H18aZ4K7wD3hXvhffHB+Mj8fH4FHwmPg9fiC/Bl+Nr8I34FnwHvhs/gL+Cv4a/iZ/Cz+EX8Ev4V/h3+E/4DfxvAkTAEIgEKoGLIEAQJUgR5AmqBG2CIcGcYEtwJngQ/AhBhHBCLCGZkEHIJRQSSgjlhFrCSUIroZPQSxgkDBNuECYJM4RHhEXCS8Ia4RNhg/CbCBExRBKRjchNpBPFiTJEJaIGUY9oSrQmOhLdiD7EIGI4MZaYTMwk5hGLiEeJlcR64iliO/E8sZ84RBwj3iJOEx8SnxJfEN8S14kbxN8kiIQlkUk0Ei9JiCRJkiOpkrRJRiQLkj1pD8mbFEAKI8WQkkkZpDxSEekYqZLUQGomdZB6SBdJw6Rx0h3SLOkxaZn0hvSB9I20RYbIGDKZTCPzkoXJDLI8WY2sSzYhW5Edye5kP3IwOZKcQN5HziEXkkvIFeR68mlyB7mHPEgeJo+T75LnyE/IL8hvyZ/Im+RtCpJCoFAp3BQ6RYIiR1Gl6FCMKVYUR4o7xY8STImiJFLSKbmUIsoxSjWlkdJK6aL0UYYoY5RJyn3KAmWZ8obykbJB+cOCYMGzUFm4WegsEizyLGosuiwmLDYsziyeLAEsYSyxLKksWSwHWEpYKlgaWJpZzrJcYLnMMsZym2WGZYFlmWWVZZ1lk2WbFcVKZGVn5WUVYZViVWLVZDVktWB1YHVj9WMNYY1mTWbNZC1gPcJazlrP2sx6lvUC6xDrGOsk6yzrY9YXrGusn1l/UgEVS6VQOamCVAmqHFWNqkc1o9pR91B9qExqFDWJmknNpx6mllPrqc3UTmof9Qr1BvUu9QH1KXWF+p76jfqbDcFGYGNj42UTYZNmU2bTZjNhs2FzYfNmC2KLZEtky2DLZzvMVs7WwNbC1sXWz3aVbZxtiu0R2xLbG7Z1tk22HXYMO4Wdk53OLsmuwK7Bbshuye7I7skewB7OnsCezp7Hfpi9nL2evYW9i32AfZh9gv0e+zz7c/a37F/Yf9EgGp5GpfHSRGgyNBWaLs2UZkdzo/nRQmmxtDRaDu0QrYxWR2umddL6acO0Cdo92gLtOW2N9pW2xYHgIHKwc/BziHPIc6hzGHBYcjhxeHIEckRyJHHs5zjAcZSjmqOJo4PjAscQxw2OKY5HHMscbzm+cGxxIjiJnOyc/JzinPKcGpyGnFaczpzenEzOaM4UzmzOIs5SznrOFs5znBc5Rzlvc85yPuV8xfmR8wcX4MJxUbl4uUS55LjUuQy4LLmcuLy5mFzRXClcOVyHuMq46rlauc5zDXKNcd3hesC1xLXK9ZlrixvBTeTm4BbkZnArcWtzm3Lbcbtz+3NHcCdy7+c+yH2cu5a7mbuL+yL3KPck9xz3M+433J+5t3gQPCQeDh46jxSPMo8ujxmPA48nTyBPFE8KTw7PIZ5ynhM8bTw9PEM84zzTPAs8L3k+8Gzw7PDieNl4+XkleBV4tXhNeO143XkDeCN5k3izeIt4y3gbeNt4e3iHeMd57/E+5l3h/cj7gw/iI/DR+AT5GHzKfLp85nyOfF58TL5Yvn18+XwlfNV8p/g6+Qb4rvHd4XvIt8y3xved7y8/lp/Kz8cvwa/Ir81vyu/A78kfxB/Dn8afx1/CX81/ir+L/yL/Nf67/I/4X/C/598QAAJ4AZqAoICUgIqAnoClgLOAr0CoQIJApkChQJlAg0C7QK/AVYGbArMCiwKrAl8F/ghiBKmCfIISgkqCOoLmgk6C3oIhgvGCGYIHBUsFGwTbBHsFrwreEpwVfCb4VvCb4F86ls5GF6Az6Cp0fboV3YXuRw+nJ9Gz6cX0SnoTvZN+kT5Gn6Iv0Ffo6/RfQkghihCPkJiQgpC2kJmQo5C3UIhQvNB+oSKhcqFGoQ6hfqFRobtC80IvhT4K/RRGClOEeYTFhBWEdYTNhZ2EfYXDhBOFs4SLhSuFm4S7hAeFrwvfE34i/Eb4i/AfEawIm4igiJSIqoihiI2Iu0igSIzIPpEDIsdFGkTaRfpERkTuiDwSeSmyLvJLFCXKIsonKimqLKovai3qKhogGi2aJlogely0XrRdtE90RPSO6Lzoiui66JYYWowqJiDGEFMVMxSzFfMQY4rFimWIFYqVi50U6xQbFLshNiO2KLYq9k1sR5wgzikuIi4vri1uLu4s7iceIZ4ini9+TLxevF28T3xU/K74gvgr8c/i2xI4CZqEkISshKaEmYSThK9EuESyRJ7EUYk6iTaJPolRibsSjyVeS3yR2JbES3JIikjKS2pLWki6SO6VjJJMkzwgWSp5QvKs5EXJG5Izks8k1yQ3GTCDwuBlSDJUGIYMW4YnI4SRwMhmHGbUMFoZvYwRxl3GAuM14wvjrxRBiktKVEpRSk/KSspNKkgqTipT6pBUlVSzVI/UValJqXmpV1JfpP5K46U5pUWlFaX1pK2l3aWZ0vHSWdKHpWukW6R7pUek70o/ln4j/U0GkiHL8MpIyqjKGMnYy3jLhMkky+TJHJM5IXNWZlBmXGZWZlnmo8yWLEaWXVZIVl5WR9ZS1lU2SDZOdr9ssWyNbKvsBdlrstOyT2XXZDflkHKscgJyMnKacuZyLnL+cjFyGXKH5KrkWuR65UblpuSeyr2V25RHyLPKC8jLyGvJm8vvkQ+Qj5XfL18sXyPfJt8nPyY/I/9M/r38LwW0AruCsIK8gq6CtYKHQohCokKuwjGFEwqdCpcUbio8VFhR+KKwo0hS5FGUVFRTNFF0UtyrGK2YoXhIsVqxVbFPcUxxRnFJ8YPilhJWiUNJVElJyUDJTslbKVwpTemgUoXSaaUepRGlKaVFpXdKP5XRyuzKIsqKyvrKtsreyuHKqcoHlCuUTyv3KI8qTysvKr9X/qWCUeFQEVVRVjFUsVfxVYlUSVcpUqlWaVXpV7muMqvyXOWTyrYqUZVHlaGqrmqm6qIaqBqvmq16VLVBtVN1SPW26oLqquqGGlKNTU1ITUFNX81OzVstQm2fWpFalVqrWr/aDbU5tRdqn9V21Mnq/Ooy6trqluru6iHqyeoF6uXqp9V71a+pz6gvq6+rb2sQNXg1pDQ0NSw03DSCNZI08jXKNE5p9Ghc05jRWNZY19jWJGryakpramlaarprhmimaB7QrNBs1uzTvK45q/lC84sW0KJoCWrJaelq2Wp5a0VopWsd0qrVOqM1qHVLa15rVWtTG61N0xbTVtE20XbWDtSO187VPq7dpN2tPao9o72s/Un7rw5ZR0BHVkdXx1bHWydSJ0OnWKdO56zOZZ1JnSc673R+6eJ0uXUZupq6FrruuqG6qbqFutW6bboXdW/qzuuu6v7Qw+hx6knoqeuZ67npheil6B3Uq9Jr07uod1NvXm9V74c+Rp9TX0JfXd9c300/RD9Vv1C/Wr9df1D/lv5j/TX9XwY4A24DKQMtAysDT4MIg3SDYoN6g06DKwZTBs8MPhr8NSQbChjKG+ob2hvuNYw1zDE8bnjKsNfwuuGc4SvD70YoI5qRuJGakbmRm1GoUapRkVGtUYfRkNEdo0Wjj0bbxmRjQWN5YwNjR2N/43jjPONy42bjfuMJ43njVeOfJjgTHhNpE20TGxMfk2iTLJNjJk0mvSZjJnMmr0w2TNGmnKaSppqmVqZeppGmmaYlpo2m3abXTGdNV0y/m6HMOM0kzTTNrMy8zCLNMs2Omp006zEbM5sze2W2aY4x5zJnmGub25j7mEebZ5sfNz9l3mc+bv7I/K35Lwu8BZ+FrIW+hYOFv0WCRb5FpUWbxSWLSYtFi48WO5YslsKWypamlq6WoZb7LIstGyzPWY5azlquWG5Yoa24rKSstK1srfys4qxyrcqtWq0uWt22emr10WrHmsVa2FrF2sza3TrMOt36iHWjdY/1deuH1qvWv2zwNnw2cjYGNk42QTbJNoU2tTadNsM2MzYvbb7bom25baVtdW3tbf1tE2wLbKtsz9hesZ22fW771Q5px2nHsNO2s7Xzs4u3y7ertDtjN2Q3Zbds99Ueac9hz7DXtrez32sfb19gX2XfYX/Fftr+hf03B7QDl4O0g66Dg0OAQ5LDQYdahy6HEYdZh1cOPxxxjnyO8o6Gji6OIY5pjocdGx17HG84zjuuOf5xojgJO6k4mTt5OkU5ZTuVOrU4DTrdcVpy+uKMdOZwZjjrONs7BzgnORc61zmfc77m/MB51XnLheRCd1F2MXPxcIl0yXIpdWlxGXS547Lk8nUPag/XHuk9ensc9zD3pO4p3nNiT8+e8T0Le97v+etKdRVz1XC1dvVzjXctcK1x7XQdcZ1zfeO65UZyo7upuJm7eblFu+W6VbidcbviNuO24vbDHe8u4K7oburu7h7pnu1e5t7mftl92v2l+4YHzoPfQ8HDxMPdI8Ijy6PMo83jsse0x0uPTU+cJ7+noqepp4dnpGe2Z7lnu+cVzxnPV54/vQhegl7KXuZeXl4xXnleVV5nvUa85rxWvX57U7xFvNW9rb33eid6F3rXe3d73/Be8P7gA/nQfBg+uj6OPkyffT4lPqd8Bnzu+Cz7fPPF+vL5Kvia+Hr4Rvnm+lb6dviO+M75rvr+8WPxE/PT9LPzC/BL8Sv2O+nX53fb75nf173ovbx75fea7HXfG7U3d2/l3rN7R/Y+2Lu2d9uf6i/hr+3v4M/03+df4n/af9B/yv+F/2YAIYAeoBpgGeAbkBBQGNAQ0BtwM+BpwOdAVCBPoHygSaBHYHRgXmB1YFfgWOB84IcgKIgjSDrIIGhPUHhQVlBFUEfQSNCDoLWgv0w2JoOpx3RmhjIzmWXMduZV5izzLXM7mBosEawb7BQcEpwZXBrcFnw1eDb4bfB2CDVEMkQ3xDkkNGR/SFnImZDhkAchayE7oeyhUqH6oXtCw0OzQytDz4ZeC30U+iEMDuMMkw0zDnMPiw7LD6sJOx82HvY07HM4OpwvXCncItwnPCG8KLwxvD98Mvx5+GYEMUI4QiPCLiIoYl/EsYjWiCsRsxFvI/5GskdKRRpEukZGRuZGVkeei7wR+STycxQ6ii9KOcoyyi8qKao4qilqMGo66lXUVjRrtES0brRzdHh0dnRldFf09ejH0Z9j0DF8McoxljF7Y5JjDsecjrkUMxPzJmY7li1WKtYg1i02KjY/tja2J/Zm7FLs9zhCnHCcRpx9XHBcRlxZXEfcaNx83Ho8Mp43XineIt4vPjn+SHxz/OX4+/Fv43cSOBJkEowTPBPiEgoTGhMGEqYSXiVsJbImSibqJ7omRiXmJ9Yl9ibeTnye+COJnCSepJvkkhSRlJtUk9SddDNpKWkzmZQsmqyd7JQcnpyTXJ18Pvlm8lLyRgoxRTRFO8UpJTwlJ6U6pTvlZspSymYqKVUsVSfVJTUiNTe1NrUn9Xbq89SfaZQ0iTS9NNe06LSCtIa0vrS7aStpv/ex7ZPaZ7TPc1/cvqJ9TfsG983se5sO0jnT5dPN0/3Sk9NL0lvTh9Mfpa9noDL4M1QzbDOYGZkZFRldGeMZixnfM4mZopk6mS6ZkZn5mfWZfZlTma8zt/fT9svuN93vsz9p/5H9LfuH9z/av56FzhLIUs+yzwrJysqqyurOupX1POtXNms2I9sw2zM7PvtQ9unsoewH2R9ykDn8Oao5djnBOVk5VTndObdyXuT8yqXmSuUa53rlJuYezm3JHc59lPspD5NHz9PMc8wLz8vLq8vry5vKe533N58zXyHfIt8/f19+WX5n/o38Z/mbBZQCyQLDAs+C+ILiguaCqwWPCj4dwB4QOqB1wPlA5IGCAycOXDwwc2DtIHyQ96DKQduDIQezD9Yc7D145+Crg9uFnIUKhZaFAYXphRWF5wpvFj4v3CpiK5IpMivyK0otOl50tuhG0VLRj0Msh6QOGR/yOZR86OihM4fGDi0e2iimFEsWGxV7FScVlxS3F48VPy3eOEw+LHnY6LDX4aTDRw+3Hx47vHh44wjlCOOI0RHvI8lHjh05c+T6kWdHfpSwlkiXmJT4lqSWlJZ0lkyUPC/ZOsp2VPao+VH/o+lHK46eP3r76MrR7WOcxxSPWR9jHss6Vnus79j0sbfH4eN8x9WOOxyPOF5wvPH4peNzx9dLsaXCpTqlbqVxpcWlraWjpU9Kv5dRyhhlJmW+ZallZWVdZbfKXpb9KecsVyy3KQ8uzymvKx8onyl/X4GqoFdoV+ypiK04VNFSMVrxpGKjklIpVWla6Ve5r7KisrtysvJ1FajirVKtcqiKqDpQ1VQ1VPWo6ks1sVqi2qjapzqlurS6q/pW9Ur13xruGpUa+5rwmoKakzVDNY9qvtQSayVqjWp9a9Nqy2vP107Wvq4DdXx16nVOdVF1hXXNdSN1T+o26lnrZerN6wPr99fX1PfXz9S/b8A0CDfoNng0JDYcazjbMNHwsmH7BPcJlRMOJyJOHDxx6sTwiScnNhpZG2UaLRoDG7Ma6xoHGmcb10/iToqdNDzpfTL1ZPnJ7pN3Tq42IZoEm7SaXJvim0qaOpomml40bZ/iPqV6yvFU1KmiUy2nrp16durXadppxdO2p8NOF5xuOn319OPTG82szbLNls3M5pzmE82Xmx81f20ht0i1mLcEtmS11LUMtjxo+dxKbGW0mrb6t+5vrW0daJ1r/dRGaJNsM2nb25bZVtM20Dbb9qmd0C7ZbtLu357ZXts+0D7X/ukM8QzjjOmZgDP7z9SdGTzz4MyXDnKHVId5R1BHdkdDx+WO+Y5vZ1nOyp61OhtyNu/sybNXzz45+6OTvVOh07YzvPNgZ3Pntc6lzt9dXF2qXU5dMV2Hu850TXStnAPn+M9pnXM7l3iu9Nz5c3fPrZ1Hnxc5b3De93z6+erz/efnzn/uJnVLdVt0M7tzuxu7r3Y/6f7RQ+tR6nHoieo51NPeM96z0gt6BXq1ez16k3vLe3t67/V+uIC/IHHB9ELAhewLJy4MXXh8YbOPvU+pz74vqq+4r71vou9VP9wv2K/b79Wf1l/Z39c/2/95gDwgM2A5EDJQMHB64NrA8sD2Rd6LmhfdLiZdLLvYc/HexY+DhEHGoPkgczBvsGlwZPDZ4O9L3Jc0LrleSrxUeqn70vSlj5cJlxmXzS8HX86/fOry6OXly9tDvENaQ+5DyUMVQxeG7g99vkK+InvF+kr4lcIrrVfGr6xcha/Sr+pf9bmacbXu6qWrC1c3h2nDysNOw3HDR4fPDU8Nvx/BjzBGzEeCRwpGmkfGRl6MglHBUb1R79H00drRS6MLoz+u0a6pXHO+Fn/t+LXua/eurY+RxmTGrMfCx4rG2sdujr25jrouet34esD1nOsnr49eX77+9wb/DZ0bXjfSb9TeuHRj4caPcc5xtfE940nj5eMXxmfHv06wTihMOEzETBydODcxNfHxJvGmzE3rmxE3D93suHn75tot7C3JW+a3Qm4duNV6a/zW69uo26K3TW4H3c67ffr29dsvJ+FJ4UnDSf/JnMmmydHJ53fAHfodgzt+d7LuNN4ZubN8Z+eu4F39u7539989cXf47tLdv1MCU3pTvlP7p05MDU8tTf2dFpzWn/abzppunB6ZXp7euUe/Z3Bv773seyfvXbv3YgaaEZoxmgmYyZ05NXN9ZuU+4r7ofZP7zPsF91vuT9x/M4uZlZg1nw2dLZw9M3t79t0cfk56zmYucu7IXNfc9Nz6A8oDhQcOD+IelD7ofTD34PtD9oeqD10fpjysejj48PHDrUc8j7QfeT/KfHTi0cij5XkwLzRvNB84nz/fMj8xv7qAXWAsWC1ELBxe6FqYXvj0mOWx4mOnxwmPyx/3P370+OcT7idaT7yeZDw58WTkyfOn0FPhpyZPmU8PPG1/evvpu0XCouyi3WLM4vHF3sUHixvPOJ5pPPN4lv6s/tnws+UlaEl4yWSJuXRwqX1pcunDMmlZftlhOX65fLl/eX7513Oe5zrPfZ9nPW96fv356xfoF5IvrF5Evjjy4vyL+y++vaS9VH/p8XLfy/qXwy+fr8AroitmK6Erh1Y6V6ZXPr+ivlJ55foq9VXtqyuvll5Dr0Vem74OeV30+uzrqdef31DfqLxxfZP2pu7N1TfLq/Cq6KrZathq8WrX6szq17fsb9XferxNf3vi7ejblTXUmuSa1VrU2tG13rUHaz/ecb/Teef7Ludd87uJd2vvCe/l3ju+T3hf+f7S+8X3fz8IfTD5EPyh6EPnh3sfvn5k/6j+0fNj5seTH69/fL2OXZdet1uPWy9fv7j+ZH37E/2T8afgT0WfOj/d+/T1M+2zxmevz/s/N30e//z2C+GL3BfHL4lfqr8MfVn6Cn0V/WrxNeJrydeerw+//vzG+03/W8C3gm9nvt399vk723e1757fM783fb/x/e0GYUN+w2kjeaNm4+rG803kpsSm9WbMZunmwObjze0fQj9MfoT+OPyj+8fcjx8/eX/q/Qz4eeBnx8/pn19+0X5p/vL5lfOr5dftXx+2WLZUtty3MrZObt3Yevub+Fvht8vv1N/1v0d/v/qD/SPzx+FP0p+aP1f/vNhGbTO2bbfjtyu3L28v/YX/Svy1/hvzt/zv4N/FHbAjtmO5E7VTujOw83Rn5997JbuB+Kc5PQ+ASwYANlMA1NQCIB4CAMX7fwFemJ1oNB/qSgAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAw5JREFUeNrtnN1uwyAMhRfK+79xuy0XkaIoJCn459gcS9Nu2ob4s8E2huX3X34oMFKoAgKhEAiBUAiEQCgEQiAUAplbqtWDlmVxecFohYiaFUTr+eiAqgcMDaU8Bb//HCKcRau4iGaZV8CQwKgAgbdCQ891j7LQYWzjOhub93o3fdh7BsYbSpnNO56A8YRSZofRWkO8oDBTB4NS6B1YUOghDXm/3y5QCr2joZjiY6s1orLuLFbKMNbf2Z61/rcwuJoJRAavFfNLzRdfFdw7j4981wPokId8Ph9zr3iqoOP3JKYci2lryENerxckjLPseyRasvSSMGFvr1Kka1XaIfAUeYiEhVt5SYmiyFHLRCkehvcQLSio09YQEKts9ghl/RsNKFC9ZEijlvWeo3WvIbe1Ui3WkYI0pURanLVC/iqlKKuaD0opRCspVimdIEcx6FK0rHe0hpQ5pzENe9G6OKb2kCsoGcFovFPRdO1ZwMBFWU+8ZQ/CcwMJ3SDMSidX7Zv0GgcgaGBGPFOzZLR433VieUxAcqrcfkt6jO5NDlcJpYYCkbJ9SCB3AUALVu/euvR0I10qgmwDelKG6VlvIrQEwfdlSdTIIvVmhWqUm+GuNTZbEwiFQAiEQiBJAg2RKOtpOMobaRWBrF0X3270R7sIJgyQbwuCd9l2NDCaVek6OpgnyrzLtrOeU1QHslfc2rXYU6i7a4KI5DUaY+yOsqSqptxJFACiYRlRwGiPpaIM5G69iRoApEoMZ2wlCpGpI95rNTWQFpiM3hKylpXZW8IWF7NCCV3tRbqaj0Ccw3N3IMjxf6p7urK8SJapq2SaFjJASbeGWEHR6oAv2S1Qa5z7SxPoIR05igQYkwvbes6HRNrhOwPRO2aL9x7eD0GfuqT2WKyMcOgEVbS98J7rZa07ZYaPtEVsUEA+1jC8qB+vaIoQfW01sG8v1TQxFqlDn2yCAwt7eWsDYB4y01ZrCCD0FqA1xCIxo4coTWOUtpidwiUUEA+hEAiBUAiEQCgEQiAUAqEQCIFQCIRAKELyB2i949MfgtS4AAAAAElFTkSuQmCC';
    var TEST_IMAGE = 'data:image/png;base64,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';
    var dx = [+0, +1, +0, -1, +1, +1, -1, -1];
    var dy = [+1, +0, -1, +0, +1, -1, +1, -1];

    /**
     * @constructor
     */
    var BWImage = function BWImage() {
        this._width = 100;
        this._height = 100;
        this._matrix = [];
        this._lengthMatrix = [];
        this._linePoints = [];
        this._squaresData = [];
    };

    BWImage.prototype._isBlackPoint = function (x, y) {
        return (
            this._matrix[x][y][0] === 0 &&
            this._matrix[x][y][1] === 0 &&
            this._matrix[x][y][2] === 0
        );
    };

    BWImage.prototype._findAnyPoint = function () {
        var result = [null, null];
        var width = this._matrix[0].length;
        var height = this._matrix.length;

        for (var i = 0; i < height; ++i) {
            for (var j = 0; j < width; ++j) {
                if (this._isBlackPoint(i, j)) {
                    return [i, j];
                }
            }
        }

        return result;
    };

    BWImage.prototype.waveFrom = function (startPoint) {
        for (var i = 0; i < this._height; ++i) {
            this._lengthMatrix[i] = [];
            for (var j = 0; j < this._width; ++j) {
                this._lengthMatrix[i][j] = null;
            }
        }

        var result = [null, null];
        var pointToKey = function (point) {
            return point.join(':');
        };

        var maxLength = 0;
        var queue = [[startPoint, 0]];
        var was = {};

        was[pointToKey(startPoint)] = true;

        while (queue.length > 0) {
            var x = queue[0][0][0];
            var y = queue[0][0][1];
            var length = queue[0][1];

            this._lengthMatrix[x][y] = length;

            if (maxLength < length) {
                result = [x, y];
            }

            for (var k = 0; k < dx.length; ++k) {
                var x1 = x + dx[k];
                var y1 = y + dy[k];
                var point = [x1, y1];
                var pointKey = pointToKey(point);

                try {
                    if (!was[pointKey] && this._isBlackPoint(x1, y1)) {
                        queue.push([point, length + 1]);
                        was[pointKey] = true;
                    }
                } catch (e) {
                    // OK
                }
            }

            queue.shift();
        }

        return result;
    };

    BWImage.prototype._findEdgePoints = function () {
        var startPoint = this._findAnyPoint();

        this._edge1 = this.waveFrom(startPoint);
        //noinspection JSUnusedGlobalSymbols
        this._edge2 = this.waveFrom(this._edge1);

        //this._matrix[edge1[0]][edge1[1]] = [255,0,0];
        //this._matrix[edge2[0]][edge2[1]] = [255,0,0];
    };

    BWImage.prototype._setBase64 = function (base64, callback) {
        var self = this;
        var canvas = $('<canvas/>')[0];
        var context = canvas.getContext("2d");

        var image = new Image();

        image.onload = function () {
            var imageWidth = image.width;
            var imageHeigth = image.height;

            canvas.width = imageWidth;
            canvas.height = imageHeigth;

            self._width = imageWidth;
            self._height = imageHeigth;

            context.drawImage(image, 0, 0);

            var imageData = context.getImageData(0, 0, self._width, self._height);

            for (var i = 0; i < self._height; ++i) {
                self._matrix[i] = [];

                for (var j = 0; j < self._width; ++j) {
                    var k = (j * self._height + i) * 4;

                    //noinspection PointlessArithmeticExpressionJS
                    self._matrix[i][j] = [
                        imageData.data[k + 0],
                        imageData.data[k + 1],
                        imageData.data[k + 2]
                    ];
                }
            }

            callback();
        };

        image.src = base64;
    };

    BWImage.prototype.getWidth = function getWidth() {
        return this._width;
    };

    BWImage.prototype.getHeight = function getHeight() {
        return this._height;
    };

    BWImage.prototype.isInLinePoint = function (point) {
        for (var i = 0; i < this._linePoints.length; ++i) {
            if (this.isEqualPoint(this._linePoints[i], point)) {
                return true;
            }
        }

        return false;
    };

    /**
     *
     * @param x1
     * @param x2
     * @param y
     * @param context
     */
    BWImage.prototype.drawHorisontal = function (x1, x2, y, context) {
        if (x1 > x2) {
            x2 = [x1, x1 = x2][0];
        }

        for (var x = x1; x <= x2; ++x) {
            context.fillRect(x, y, 1, 1);
        }
    };

    /**
     *
     * @param y1
     * @param y2
     * @param x
     * @param context
     */
    BWImage.prototype.drawVertical = function (y1, y2, x, context) {
        if (y1 > y2) {
            y2 = [y1, y1 = y2][0];
        }

        for (var y = y1; y <= y2; ++y) {
            context.fillRect(x, y, 1, 1);
        }
    };

    BWImage.prototype.getCanvas = function getCanvas(needBlack) {
        var $canvas = $('<canvas/>');
        $canvas[0].width = this._width;
        $canvas[0].height = this._height;
        var context = $canvas[0].getContext('2d');
        var width = this.getWidth();
        var height = this.getHeight();
        var imageData = context.createImageData(width, height);

        //$canvas.width(this.getWidth());
        //$canvas.height(this.getHeight());

        for (var i = 0; i < width; ++i) {
            for (var j = 0; j < height; ++j) {
                var k = (i * height + j) * 4;

                if (this.isInLinePoint([j, i])) {
                    //noinspection PointlessArithmeticExpressionJS
                    imageData.data[k + 0] = 255;
                    imageData.data[k + 1] = 0;
                    imageData.data[k + 2] = 0;
                    imageData.data[k + 3] = 255;
                } else {
                    if (needBlack) {
                        //noinspection PointlessArithmeticExpressionJS
                        imageData.data[k + 0] = this._matrix[j][i][0];
                        imageData.data[k + 1] = this._matrix[j][i][1];
                        imageData.data[k + 2] = this._matrix[j][i][2];
                        imageData.data[k + 3] = 255;
                    } else {
                        //noinspection PointlessArithmeticExpressionJS
                        imageData.data[k + 0] = 255;
                        imageData.data[k + 1] = 255;
                        imageData.data[k + 2] = 255;
                        imageData.data[k + 3] = 255;
                    }
                }
            }
        }

        context.putImageData(imageData, 0, 0);

        context.fillStyle = 'green';

        for (i = 0; i < this._squaresData.length; ++i) {
            //if (i === 1) {
            //    break;
            //}
            var p1 = this._squaresData[i][0];
            var p2 = this._squaresData[i][1];

            var x1 = p1[0];
            var y1 = p1[1];
            var x2 = p2[0];
            var y2 = p2[1];

            this.drawHorisontal(x1, x2, y1, context);
            this.drawHorisontal(x1, x2, y2, context);
            this.drawVertical(y1, y2, x1, context);
            this.drawVertical(y1, y2, x2, context);
        }

        context.fillRect(100, 100, 1, 1);

        return $canvas;
    };

    BWImage.prototype.isEqualPoint = function (point1, point2) {
        return (
            point1[0] === point2[0] &&
            point1[1] === point2[1]
        )
    };

    BWImage.prototype._thinLine = function () {
        var edge2 = this.waveFrom(this._edge1);

        var currentLength = this._lengthMatrix[edge2[0]][edge2[1]];
        var startPoint = edge2;

        this._linePoints = [startPoint];

        while (!this.isEqualPoint(startPoint, this._edge1)) {
            var x = startPoint[0];
            var y = startPoint[1];

            //this._matrix[x][y] = [255,0,0];
            //this._matrix[x][y] = [255,0,0];

            for (var k = 0; k < dx.length; ++k) {
                var x1 = x + dx[k];
                var y1 = y + dy[k];
                var point = [x1, y1];

                try {
                    var length = this._lengthMatrix[x1][y1];

                    if (length === currentLength - 1) {
                        startPoint = point;
                        currentLength--;

                        this._linePoints.push(startPoint);

                        break;
                    }
                } catch (e) {
                    // OK
                }
            }
        }
    };

    BWImage.prototype.isMiddle = function (point1, point2, pointQ) {
        var x1 = point1[0];
        var y1 = point1[1];
        var x2 = point2[0];
        var y2 = point2[1];
        var xQ = pointQ[0];
        var yQ = pointQ[1];

        if (x1 > x2) {
            x2 = [x1, x1 = x2][0];
        }

        if (y1 > y2) {
            y2 = [y1, y1 = y2][0];
        }

        return (
            (x1 < xQ && xQ < x2) ||
            (y1 < yQ && yQ < y2)
        )
    };

    BWImage.prototype._squarize = function () {
        this._squaresData = [];

        var points = this._linePoints;
        var cursorToStart = 0;
        var cursorToCurrent;

        while (true) {
            var pointStart = points[cursorToStart];
            cursorToCurrent = cursorToStart + 1;
            var pointCurrent = points[cursorToCurrent];

            while (true) {
                var cursorToNext = cursorToCurrent + 1;

                if (cursorToNext >= this._linePoints.length) {
                    this._squaresData.push([pointStart, pointCurrent]);
                    return;
                }

                var pointNext = points[cursorToNext];

                this._lastCanvasContext.fillStyle = 'red';
                this._lastCanvasContext.fillRect(pointNext[0], pointNext[1], 1, 1);

                if (this.isMiddle(pointStart, pointCurrent, pointNext)) {
                    this._squaresData.push([pointStart, pointCurrent]);
                    cursorToStart = cursorToCurrent;
                    break;
                } else {
                    pointCurrent = pointNext;
                    cursorToCurrent++;
                }
            }
        }
    };

    BWImage.prototype.loadTest = function ($container) {
        var self = this;

        self._setBase64(TEST_IMAGE, function () {
            self._lastCanvas = self.getCanvas(true);
            self._lastCanvasContext = self._lastCanvas[0].getContext('2d');
            $container.append(self._lastCanvas);
            self._findEdgePoints();
            self._thinLine();
            self._squarize();
            console.log(self._squaresData);
            $container.append(self.getCanvas(false));
        });
    };

    return BWImage;
});
