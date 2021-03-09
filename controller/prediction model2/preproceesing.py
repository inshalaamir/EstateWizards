import csv

with open('data.csv', 'r') as fin, open('fout.csv', 'w', newline='') as fout:

    # define reader and writer objects
    reader = csv.reader(fin, skipinitialspace=True)
    writer = csv.writer(fout, delimiter=',')

    # write headers
    writer.writerow(next(reader))

    # iterate and write rows based on condition
    for i in reader:
        if (i[3] =='Flat' or i[3]=='House'):
            if (i[6]=='Karachi' or i[6]=='Islamabad' or i[6]=='Lahore' or i[6]=='Rawalpindi'):

                if (i[10]!='0' and i[13]!='0'):
                    if i[12]=='For Sale':
                        try:
                            if  'Kanal' in i[11]:
                                a=i[11][0:len(i[11])-6]
                                b=float(a)
                                c=b*20
                                i[11]=c
                            else:
                                a=i[11][0:len(i[11])-6]
                                b=float(a)
                                i[11]=b
                            writer.writerow(i)
                        except Exception as e:
                            print(i)
                            print(e)